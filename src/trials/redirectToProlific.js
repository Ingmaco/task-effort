import { jsPsych } from "jspsych-react";
import { lang } from "../config/main";

const redirectToProlific = () => {
  const completion_url = lang.prolific.completion_code_url;
  const duration = 2000;

  return {
    type: "html_keyboard_response",
    stimulus: lang.countdown.redirect_to_prolific,
    choices: jsPsych.NO_KEYS,
    trial_duration: duration,
    on_finish: () => {
      window.location.href = completion_url;
    }
  };
};

export default redirectToProlific;
