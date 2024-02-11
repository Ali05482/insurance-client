import React, { useState, useEffect } from "react";
import _ from "lodash";
import Signature from "signature_pad";
import { FaSave, FaUndo, FaRedo, FaEraser, FaSignature } from "react-icons/fa";

export default function SignaturePad({ isEdit, signature, setSignature }) {
  const [signaturePad, setSignaturePad] = useState();
  const [savedSignature, setSavedSignature] = useState("");
  let signatureRedoArray = [];

  const readyPad = () => {
    let wrapper = document.getElementById("signature-pad");
    let canvas = wrapper?.querySelector("canvas");
    canvas.getContext("2d").scale(1, 1);
    let tempSignaturePad = new Signature(canvas, {
      backgroundColor: "rgb(255, 255, 255)",
    });
    setSignaturePad(tempSignaturePad);
  };

  const handleSave = () => {
    setSignature(signaturePad.toDataURL());
    setSavedSignature(signaturePad.toDataURL());
  };

  const handleUndo = () => {
    let signatureRemovedData = [];
    let signatureData = signaturePad.toData();
    let signatureRedoData = _.cloneDeep(signatureData); //original data

    if (signatureData.length > 0) {
      signatureData.pop(); // remove the last dot or line
      signaturePad.fromData(signatureData);
      signatureRemovedData = signatureRedoData[signatureRedoData.length - 1];
      signatureRedoArray.push(signatureRemovedData);
    }
  };

  const handleRedo = () => {
    if (signatureRedoArray.length !== 0) {
      let values = signaturePad.toData();
      let lastValue = signatureRedoArray[signatureRedoArray.length - 1];
      values.push(lastValue);
      signaturePad.fromData(values);
      signatureRedoArray.pop(lastValue); //remove the redo item from array
    }
  };

  const handleClear = () => {
    signaturePad.clear();
  };
  console.log("savedSignature", savedSignature);
  useEffect(() => {
    readyPad();
  }, []);

  return (
    <div className="App">
      <div id="signature-pad">
        <canvas className="signature-canvas "></canvas>
        <div>
          <button
            type="button"
            className="btn btn-success mx-2 my-2"
            onClick={handleSave}
          >
            <FaSave /> Save
          </button>
          <button
            type="button"
            className="btn btn-primary mx-2 my-2"
            onClick={handleUndo}
          >
            <FaUndo /> Undo
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-2 my-2"
            onClick={handleRedo}
          >
            <FaRedo /> Redo
          </button>
          <button
            type="button"
            className="btn btn-danger mx-2 my-2"
            onClick={handleClear}
          >
            <FaEraser /> Clear
          </button>
        </div>
      </div>
      <div className="saved-signature">
        <h3>
          Your Signature <FaSignature />
        </h3>
        {savedSignature && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="signature-image"
            alt="saved-signature"
            src={isEdit ? signature : savedSignature}
          />
        )}
      </div>
    </div>
  );
}
