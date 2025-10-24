import app from "./app";
import { Server } from "http";

const PORT: string | number = process.env.PORT || 3000;
const NODE_ENV: string = process.env.NODE_ENV || "development";

const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);

});

export default server;