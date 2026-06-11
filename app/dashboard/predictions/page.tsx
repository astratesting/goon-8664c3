import { getPredictions } from "@/lib/predictions";
import PredictionsClient from "./PredictionsClient";

export default function PredictionsPage() {
  const predictions = getPredictions();
  return <PredictionsClient initialPredictions={predictions} />;
}
