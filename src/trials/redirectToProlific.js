const redirectToProlific = (duration) => {
  const url = "https://app.prolific.com/submissions/complete?cc=C1EC1IBK";

  function redirect(url) {
    setTimeout(() => {
      window.location.replace(url);
    }, duration);
  }

  return {
    type: "html_keyboard_response",
    choices: jsPsych.NO_KEYS,
    stimulus: "",
    response_ends_trial: false,
    trial_duration: duration,
    on_finish: () => {
      redirect(url);
    },
  };
};

export default redirectToProlific;