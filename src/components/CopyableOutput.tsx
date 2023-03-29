import {useState} from "react";

export function CopyableOutput({value}: { value: any }) {
    const [isCopied, setIsCopied] = useState(false)

    async function handleCopy() {
        await navigator.clipboard.writeText(value.toString())
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 500)
    }

    return <div className="flex my-2">
        <input value={value} readOnly={true} className="w-10/12 input"/>
        <button className="w-2/12 ml-2 min-w-[5em]" onClick={handleCopy}>{isCopied ? "Copied!" : "Copy"}</button>
    </div>
}
