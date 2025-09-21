import { useTyping } from "../hooks/useTyping";

function Welcome({ changePage }) {
    
    const headerTyping = useTyping("Hey There!", 100, true, 0);
    const paraTyping = useTyping("Lets analyze the risk of having a cardiovascular disease.", 50, 1200)

    if (paraTyping === "Lets analyze the risk of having a cardiovascular disease.") {
        setTimeout(() => {
            changePage();
        }, 1000)
    }

    return (
        <div id="welcome">
            <h1 className="text-6xl font-semibold text-white tracking-wide">{headerTyping}</h1>
            <p className="text-xl text-slate-200">{paraTyping}</p>
        </div>
    );
}

export default Welcome;
