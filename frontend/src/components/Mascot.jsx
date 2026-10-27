import Lottie from "lottie-react";
import { useRef, useState } from "react";
import dogAnimation from "../assets/flirting-dog.json";

export default function Mascot() {
  const lottieRef = useRef();

  const messages = [
    "Good to see you! 👋",
    "Let's finish today's sprint 🚀",
    "You've got this! 💪",
    "Keep shipping great work ✨",
    "One task at a time 😊",
  ];

  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState(messages[0]);

  const handleHover = () => {
    const random =
      messages[Math.floor(Math.random() * messages.length)];

    setMessage(random);
    setShowBubble(true);

    lottieRef.current?.goToAndPlay(0, true);
  };

  return (
    <div
      className="mascot"
      onMouseEnter={handleHover}
      onMouseLeave={() => setShowBubble(false)}
    >
      {showBubble && (
        <div className="mascot-bubble">
          {message}
        </div>
      )}

      <Lottie
        lottieRef={lottieRef}
        animationData={dogAnimation}
        loop={false}
        style={{
          width: 220,
          height: 220,
        }}
      />
    </div>
  );
}