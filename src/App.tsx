import React, {useState} from "react";
import {CardGeneratorInput, CardType, createIdCard} from "./lib/card-generator";
import {IdCardView} from "./components/IdCardView";
import {IdCardInput} from "./components/IdCardInput";


const initialInputs: CardGeneratorInput = {
    type: CardType.NewID,
    dob: "1980-01-01",
    expiration: "2030-12-31",
    manipulate: false,
}

export default function App() {
    const [inputs, setInputs] = useState(initialInputs)
    const blocks = createIdCard(inputs)

    return (
        <div className="mx-auto p-4 lg:w-2/4">
            <h1 className="text-2xl font-bold text-center py-4">ID Card Generator</h1>
            <IdCardInput inputs={inputs} onInputChange={setInputs}/>
            <hr className="my-8"/>
            <IdCardView blocks={blocks}/>
        </div>
    )
}
