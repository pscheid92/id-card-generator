import {CardGeneratorInput, CardType, describe} from "../lib/card-generator";
import React, {ChangeEvent} from "react";

export interface IdCardInputProps {
    inputs: CardGeneratorInput
    onInputChange: (inputs: CardGeneratorInput) => void
}

export function IdCardInput({inputs, onInputChange}: IdCardInputProps) {
    function handleCardType(e: ChangeEvent<HTMLSelectElement>) {
        onInputChange({...inputs, type: e.target.value as CardType})
    }

    function handleDob(e: ChangeEvent<HTMLInputElement>) {
        onInputChange({...inputs, dob: e.target.value})
    }

    function handleExpiration(e: ChangeEvent<HTMLInputElement>) {
        onInputChange({...inputs, expiration: e.target.value})
    }

    function handleManipulate(e: ChangeEvent<HTMLInputElement>) {
        onInputChange({...inputs, manipulate: e.target.checked})
    }

    return <form className="w-full">
        <fieldset>
            <label htmlFor="cardtype">Card Type:</label>
            <select id="cardtype" value={inputs.type} onChange={handleCardType}>
                {Object.values(CardType).map(x => <option key={x} value={x}>{describe(x)}</option>)}
            </select>
        </fieldset>
        <fieldset>
            <label htmlFor="dob">Date of Birth:</label>
            <input id="dob" type="date" value={inputs.dob} onChange={handleDob}/>
        </fieldset>
        <fieldset>
            <label htmlFor="expiration">Expiration Date:</label>
            <input id="expiration" type="date" value={inputs.expiration} onChange={handleExpiration}/>
        </fieldset>
        <fieldset className="checkbox">
            <input id="manipulate" type="checkbox" checked={inputs.manipulate} onChange={handleManipulate}/>
            <label htmlFor="manipulate">Invalid Checksum</label>
        </fieldset>
    </form>
}
