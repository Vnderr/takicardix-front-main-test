import React from "react";
import Text from "../atoms/Text";

function DynamicTexts({ Texts = [] }) {
    return (
        <>
            {Texts.map((text, index) => (
                <Text key={index} variant={text.variant} className={text.className}>
                    {text.text}
                </Text> 
            ))}
        </>
    );
}
export default DynamicTexts;

