import { useState } from "react";
import Input from "./Input.jsx";
import Result from "./Result.jsx";

export default function Form() {
  const [enteredState, setEnteredState] = useState({
    age: "",
    systolic: "",
    diastolic: "",
    cholesterol: "",
    bmi: "",
  });

  const [errors, setErrors] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState(null);

  function handleChange(id, value) {
    setEnteredState((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = {};

    const age = Number(enteredState.age);
    const systolic = Number(enteredState.systolic);
    const diastolic = Number(enteredState.diastolic);
    const cholMap = { normal: 1, above: 2, "well-above": 3 };
    const cholesterol = cholMap[enteredState.cholesterol || ""];
    const bmi = Number(enteredState.bmi);

    if (!age || age < 1) errs.age = "Age must be greater than 0.";
    if (!systolic || systolic < 80 || systolic > 250) errs.systolic = "Systolic must be 80-250.";
    if (!diastolic || diastolic < 40 || diastolic > 200) errs.diastolic = "Diastolic must be 40-200.";
    if (!cholesterol) errs.cholesterol = "Please select a cholesterol level.";
    if (!bmi || bmi < 1 || bmi > 60) errs.bmi = "BMI must be between 1-60.";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setIsPending(true);
      const res = await fetch("https://backend-cdd.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age_years: age,
          ap_hi: systolic,
          ap_lo: diastolic,
          cholesterol,
          bmi,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Bad Request");

      setResult({
        probability: (Number(data.probability) * 100).toFixed(1),
        risk: Number(data.cardio_prediction) === 1 ? "High Risk" : "Low Risk",
      });

      setErrors({});
    } catch (err) {
      setErrors({ global: "Error 404: Bad Request" });
    } finally {
      setIsPending(false);
    }
  }

  function handleReset() {
    setEnteredState({ age: "", systolic: "", diastolic: "", cholesterol: "", bmi: "" });
    setErrors({});
    setResult(null);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {!result && (
        <>
          <div>
            <Input
              id="age"
              name="age"
              label="Age"
              type="number"
              placeholder="Enter your age"
              range=""
              value={enteredState.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
            {errors.age && <p className="text-red-400 text-sm">{errors.age}</p>}
          </div>

          <div>
            <Input
              id="systolic"
              name="systolic"
              label="Systolic Pressure"
              type="number"
              range="(80-250)"
              placeholder="Enter systolic"
              value={enteredState.systolic}
              onChange={(e) => handleChange("systolic", e.target.value)}
            />
            {errors.systolic && <p className="text-red-400 text-sm">{errors.systolic}</p>}
          </div>

          <div>
            <Input
              id="diastolic"
              name="diastolic"
              label="Diastolic Pressure"
              type="number"
              range="(40-200)"
              placeholder="Enter diastolic"
              value={enteredState.diastolic}
              onChange={(e) => handleChange("diastolic", e.target.value)}
            />
            {errors.diastolic && <p className="text-red-400 text-sm">{errors.diastolic}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="cholesterol" className="font-medium text-white">
              Cholesterol Level{" "}
              <span className="font-thin text-sm text-gray-200">(Normal / Above / Well Above)</span>
            </label>
            <select
              id="cholesterol"
              name="cholesterol"
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={enteredState.cholesterol}
              onChange={(e) => handleChange("cholesterol", e.target.value)}
            >
              <option value="">Select level</option>
              <option value="normal">Normal</option>
              <option value="above">Above Normal</option>
              <option value="well-above">Well Above Normal</option>
            </select>
            {errors.cholesterol && <p className="text-red-400 text-sm">{errors.cholesterol}</p>}
          </div>

          <div>
            <Input
              id="bmi"
              name="bmi"
              label="BMI"
              type="number"
              step="0.1"
              range="(10-60)"
              placeholder="Enter BMI"
              value={enteredState.bmi}
              onChange={(e) => handleChange("bmi", e.target.value)}
            />
            {errors.bmi && <p className="text-red-400 text-sm">{errors.bmi}</p>}
          </div>

          {errors.global && <p className="text-red-400 text-sm">{errors.global}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </>
      )}

      {result && (
        <Result result={result} handleReset={handleReset}/>
      )}
    </form>
  );
}
