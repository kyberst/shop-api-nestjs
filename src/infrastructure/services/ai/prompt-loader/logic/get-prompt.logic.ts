import * as fs from 'fs/promises';
import * as path from 'path';

export const getPromptLogic = async (
  promptsRoot: string,
  category: string,
  filename: string
): Promise<string> => {
  try {
    const filePath = path.join(promptsRoot, category, `${filename}.md`);
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error loading prompt [${category}/${filename}]:`, error);
    return '';
  }
};
