import { type SchemaTypeDefinition } from 'sanity';

import post from './schemas/post';
import category from './schemas/category';
import author from './schemas/author';

/**
 * Exportación de todos los schemas
 * Añade nuevos schemas aquí según los vayas creando
 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, category, author],
};
