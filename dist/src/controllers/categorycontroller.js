import { fetchCategories, addCategory, deleteCategory } from '../services/categoryService.js';
export const getAllCategories = async (c) => {
    const categories = await fetchCategories();
    return c.json(categories);
};
export const createCategory = async (c) => {
    try {
        let name = '';
        try {
            // Try normal JSON parsing first
            const body = await c.req.json();
            name = body.name;
        }
        catch (jsonError) {
            // If that fails, try extracting from malformed string
            const rawBody = await c.req.text();
            console.log('Raw body:', rawBody);
            // Try to extract name from various formats
            if (rawBody.includes('name')) {
                const nameMatch = rawBody.match(/name['":\s]+([^'"}]+)/);
                if (nameMatch) {
                    name = nameMatch[1];
                }
            }
        }
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return c.json({ error: 'Category name is required' }, 400);
        }
        const newCategory = await addCategory(name.trim());
        return c.json(newCategory, 201);
    }
    catch (error) {
        console.error('Error creating category:', error);
        return c.json({ error: 'Failed to create category', details: error instanceof Error ? error.message : String(error) }, 500);
    }
};
export const removeCategory = async (c) => {
    const { id } = c.req.param();
    await deleteCategory(id);
    return c.json({ message: 'Category deleted successfully' });
};
