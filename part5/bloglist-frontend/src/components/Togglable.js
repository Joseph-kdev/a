import { useState, forwardRef, useImperativeHandle } from "react";

const Togglabe = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const showButton = { display : visible ? "none" : "" };
  const showForm = { display : visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <div>
      <div style={showButton}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showForm}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglabe.displayName = "Togglable";

export default Togglabe;