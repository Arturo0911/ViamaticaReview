
import app from "./app";


function main() {
    app.listen(app.get("port"));
    console.log("working in the port 4000");
    console.log(__dirname);
    

}

main()

