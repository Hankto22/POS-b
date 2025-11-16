import * as PrismaPkg from '@prisma/client';
// Some environments may not have the PrismaClient type exported in a way
// that TypeScript can statically verify (e.g. missing generated client). Use
// a safe runtime fallback so the project typechecks even without `prisma generate`.
const PrismaClientClass = PrismaPkg.PrismaClient || PrismaPkg.default || PrismaPkg;
// Export a runtime Prisma client instance (typed as any to avoid TS errors when client isn't generated).
export const prisma = new PrismaClientClass();
