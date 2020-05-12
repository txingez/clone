import React from 'react';
import ReCAPTCHA from 'react-grecaptcha'

const callback = function () {};
const expiredCallback = function () {};

const Captcha = (props) => (
  <div>
    <ReCAPTCHA
      sitekey="6LezFyIUAAAAAC3zoc-VF0xTWNKRAGOGz5inaMWh"
      callback={callback}
      expiredCallback={expiredCallback}
      locale="ja"
    />
  </div>
);

export default Captcha;
