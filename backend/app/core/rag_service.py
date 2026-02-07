import os
import shutil
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.docstore.document import Document
from app.core.rag_knowledge import KNOWLEDGE_BASE_TEXT
from app.core.config import settings
from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# Initialize Vector Store Path
db_directory = os.path.join(settings.DATA_DIR, "chroma_db_store")

# Global variable to cache embeddings and vector store
_embeddings = None

def get_embeddings():
    global _embeddings
    if _embeddings is None:
        print("Initializing Embeddings model (may take a moment)...")
        _embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    return _embeddings

# Function to initialize or load the vector store
def get_vector_store():
    embeddings = get_embeddings()
    # If DB directory doesn't exist, create it and ingest data
    if not os.path.exists(db_directory):
        print("Vector Store not found. Creating and ingesting knowledge base...")
        os.makedirs(db_directory, exist_ok=True)
        
        # Create Document
        doc = Document(page_content=KNOWLEDGE_BASE_TEXT, metadata={"source": "rag_knowledge.py"})
        
        # Split Text
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        texts = text_splitter.split_documents([doc])
        
        # Create VectorDB
        vectordb = Chroma.from_documents(
            documents=texts, 
            embedding=embeddings, 
            persist_directory=db_directory
        )
        print("Ingestion complete.")
        return vectordb
    else:
        # Load existing VectorDB
        vectordb = Chroma(persist_directory=db_directory, embedding_function=embeddings)
        return vectordb

# Function to get the QA Chain
def get_qa_chain():
    try:
        vectordb = get_vector_store()
        retriever = vectordb.as_retriever(search_kwargs={"k": 3})
        
        # Check for API Key (Groq preferred for speed/free tier if available, else OpenAI)
        groq_api_key = settings.GROQ_API_KEY
        openai_api_key = settings.OPENAI_API_KEY
        
        print(f"DEBUG IN SERVICE: GROQ_API_KEY found: {bool(groq_api_key)} (prefix: {str(groq_api_key)[:7]})")
        print(f"DEBUG IN SERVICE: OPENAI_API_KEY found: {bool(openai_api_key)}")
        
        if groq_api_key:
            # Using Llama 3.1 on Groq for fast inference
            llm = ChatGroq(temperature=0, api_key=groq_api_key, model_name="llama-3.1-8b-instant")
        elif openai_api_key:
            llm = ChatOpenAI(temperature=0, api_key=openai_api_key, model_name="gpt-3.5-turbo")
        else:
            print("WARNING: No LLM API Key found (GROQ_API_KEY or OPENAI_API_KEY). Chat will not function correctly.")
            return None

        # Custom Prompt
        template = """You are the official AI assistant for YESJ (Youth Empowering Service Jesuits).
        Use the following pieces of context to answer the question at the end. 
        If the answer is not in the context, politely say that you don't have that information but can connect them with the team via the contact page.
        Keep the answer concise, friendly, and professional.
        
        Context: {context}
        
        Question: {question}
        
        Helpful Answer:"""
        
        QA_CHAIN_PROMPT = PromptTemplate.from_template(template)

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=False,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )
        
        return qa_chain
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Error initializing Q&A Chain: {e}")
        return None

def query_rag(query: str):
    chain = get_qa_chain()
    if not chain:
        return "I'm sorry, I'm currently unable to process requests due to a configuration issue (Missing API Keys). Please contact the administrator."
    
    try:
        response = chain.invoke(query)
        result = response['result'] if isinstance(response, dict) else response
        return result
    except Exception as e:
        print(f"RAG Error: {e}")
        return "I encountered an error while processing your request. Please try again."
