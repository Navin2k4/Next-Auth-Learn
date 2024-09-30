import { PrismaClient} from '@prisma/client';

// doing this because of nextjs hot reload
// because globa is not affected by hotreload 
declare global{
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !== 'production') globalThis.prisma = db;