import { useState } from "react";

/**
 * Generic Block component
 * Handles common logic for all Block components:
 * - `isActive` state for hover effect
 * - `mouseEnterHandler` to activate block and call parent callback
 * 
 * `renderContent` is a function prop that returns the JSX to render inside the block.
 */
export const Block = ({ mouseEnterCallback, renderContent }) => {
  const [isActive, setActive] = useState(false);

  // Handler for mouse enter
  // Sets active state and triggers callback from parent if provided
  const mouseEnterHandler = () => {
    setActive(true);
    mouseEnterCallback?.(); // safe call in case callback is not provided
  };

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      className={isActive ? "active" : ""} // conditional class for hover effect
    >
      {renderContent()} {/* Render the custom content passed from parent */}
    </div>
  );
};

/**
 * Block1 - renders an image inside the generic Block
 */
export const Block1 = ({ mouseEnterCallback, imgSrc, imgAlt }) => (
  <Block
    mouseEnterCallback={mouseEnterCallback}
    renderContent={() => <img src={imgSrc} alt={imgAlt} />}
  />
);

/**
 * Block2 - renders text content inside the generic Block
 */
export const Block2 = ({ mouseEnterCallback, content }) => (
  <Block
    mouseEnterCallback={mouseEnterCallback}
    renderContent={() => <p>{content}</p>}
  />
);

/**
 * Block3 - renders user address inside the generic Block
 */
export const Block3 = ({ mouseEnterCallback, userData }) => (
  <Block
    mouseEnterCallback={mouseEnterCallback}
    renderContent={() => (
      <address>
        country: {userData.country}, street: {userData.street}
      </address>
    )}
  />
);
