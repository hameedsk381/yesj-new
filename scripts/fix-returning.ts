import fs from "fs";
import path from "path";

const API_DIR = path.join(process.cwd(), "app/api");

function fixFile(filePath: string) {
    let content = fs.readFileSync(filePath, "utf-8");
    if (!content.includes(".returning()")) return;

    console.log(`Fixing ${filePath}...`);

    // Pattern for update/returning
    content = content.replace(
        /const\s+(\w+)\s*=\s*await\s+db\s*\n?\s*\.update\(([^)]+)\)\s*\n?\s*\.set\(([^)]+)\)\s*\n?\s*\.where\(([^)]+)\)\s*\n?\s*\.returning\(\);/g,
        "await db.update($2).set($3).where($4);"
    );

    // Pattern for delete/returning
    content = content.replace(
        /const\s+(\w+)\s*=\s*await\s+db\s*\n?\s*\.delete\(([^)]+)\)\s*\n?\s*\.where\(([^)]+)\)\s*\n?\s*\.returning\(\);/g,
        "await db.delete($2).where($3);"
    );

    // Pattern for insert/returning
    content = content.replace(
        /const\s+(\w+)\s*=\s*await\s+db\s*\n?\s*\.insert\(([^)]+)\)\s*\n?\s*\.values\(([^)]+)\)\s*\n?\s*\.returning\(\);/g,
        "const result = await db.insert($2).values($3);"
    );

    // After removal, some variables like 'updatedContact' or 'deletedContact' might be referenced.
    // We need to clean up those checks and returns.
    // This is hard with regex, but I'll try common patterns.

    content = content.replace(
        /if\s*\(\s*(\w+)\.length\s*===\s*0\s*\)\s*{[^}]*}/g, 
        ""
    );

    content = content.replace(
        /return\s+NextResponse\.json\(\s*(\w+)\[0\]\s*\);/g,
        "return NextResponse.json({ success: true });"
    );

    fs.writeFileSync(filePath, content);
}

function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name.endsWith(".ts")) fixFile(full);
    }
}

walk(API_DIR);
console.log("Done fixing returning() calls.");
