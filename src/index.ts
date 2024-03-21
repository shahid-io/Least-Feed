import { App } from "./app"

const init = (): void => {
    const app = new App(process.env.SERVER_PORT)
    app.listen();
}
init();