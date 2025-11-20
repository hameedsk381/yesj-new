import docx

# Open the document
doc = docx.Document("YESJ WEBSITE CONTENT.docx")

# Extract all text
full_text = []
for para in doc.paragraphs:
    full_text.append(para.text)

# Write to a text file
with open("yesj_content.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(full_text))

print("Document content extracted to yesj_content.txt")