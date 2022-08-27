import React, {CSSProperties, useState} from 'react'

//@TODO: Need to define all the mappings!
const CSSPropertyKeyMappings: Record<string, keyof CSSProperties> = {
    "margin-right": "marginRight",
    "margin-left": "marginLeft",
    "margin-top": "marginTop",
    "margin-bottom": "marginBottom",
    "padding-right": "paddingRight",
    "padding-left": "paddingLeft",
    "padding-top": "paddingTop",
    "padding-bottom": "paddingBottom",
    "touch-action": "touchAction",
    "background-image": "backgroundImage",
    "transform-origin": "transformOrigin"
}

export default function InlineStylesConverter() {
    const [html, setHtml] = useState('')
    const [result, setResult] = useState(null)
    const convertInlineStylesToJsxTsxCompatible = () => {
        let m;
        const regex = /style="[a-zA-z0-9-(&\/.),%: ;"]+/gm;
        let output = html;

        while ((m = regex.exec(html)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            m.forEach((match) => {
                const splitted = match.split('"').slice(1)
                let jsonStr = '{';
                splitted.forEach((item) => {
                    if (item) {
                        const moreSplit = item.split(';')

                        moreSplit.forEach((itm) => {
                            if (itm) {
                                const evenMoreSplit = itm.split(':')
                                let key = evenMoreSplit[0]
                                let value = evenMoreSplit[1]

                                if (key) {
                                    key = key.trim()
                                    if (CSSPropertyKeyMappings[key]) {
                                        key = CSSPropertyKeyMappings[key]
                                    }
                                }
                                if (value) { value = value.trim() }

                                jsonStr = jsonStr + '"' + key + '"' + ':' + '"' + value + '"' + ',';
                            }

                        })
                        jsonStr = jsonStr.substring(0, jsonStr.length - 1) + '}';

                    }
                })
                output = output.replaceAll(match, 'style=' + '{' + jsonStr + '}')
            });
        }
        setResult(output)
    }

    const setHtmlContent = (event) => {
        const content = event?.currentTarget?.value || ''
        setHtml(content)
    }

    return (
        <div className="InlineStylesConverter">
            <div>
                <textarea onBlur={setHtmlContent} style={{minWidth: '616px', minHeight: '345px'}} />
            </div>
            <div>
                <button onClick={convertInlineStylesToJsxTsxCompatible}>Convert</button>
            </div>
            {result && (
                <>
                    <h1>Result:</h1>
                    <textarea value={result} style={{minWidth: '616px', minHeight: '345px'}} />
                </>
            )}

            <div><p>!!Result accuracy is not guaranteed, use it at your own risk <span style={{fontSize: '15px'}}>&#128113;</span></p></div>


            <div>
                <br />If you found issues or have suggestions for improvements, please feel free to contribute on the following link. Thank you! <br /><br />
                <a href="https://github.com/farsabbutt/inline-style-to-tsx-jsx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"/></svg>
                    &nbsp; Github
                </a>
            </div>
    </div>
    )
}
