export default function FeedbackOverlay({ feedback }) {
  if (!feedback) return null;
  return <div className={`feedback-overlay feedback-${feedback}`} />;
}
