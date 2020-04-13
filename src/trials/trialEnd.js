import { eventCodes, IS_ELECTRON, AT_HOME } from "../config/main";
import { photodiodeGhostBox, pdSpotEncode } from "../lib/markup/photodiode";

const trialEnd = (duration) => {
  // debugger;
  const endCode = eventCodes.trialFinish;

  return {
    type: "html_keyboard_response",
    stimulus: "",
    response_ends_trial: false,
    trial_duration: duration,
    on_load: () => {},
    on_start: (trial) => {
      debugger;
      if (IS_ELECTRON && !AT_HOME) trial.stimulus += photodiodeGhostBox();
    },
    on_finish: (data) => {
      pdSpotEncode(endCode);
      data.code = endCode;
    },
  };
};

export default trialEnd;
