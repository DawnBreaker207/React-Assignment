import dotnet from 'dotenv';
dotnet.config({ path: './.env' });

const { PORT, URI, JWT_SECRET } = process.env;
export { JWT_SECRET, PORT, URI };

