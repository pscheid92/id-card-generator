import {Blocks} from "../lib/card-generator";
import {CopyableOutput} from "./CopyableOutput";
import React from "react";

export function IdCardView({blocks}: { blocks: Blocks }) {
    return <div>
        {blocks.map(b => <CopyableOutput key={b} value={b}/>)}
    </div>
}
