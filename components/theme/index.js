import React, { Component } from "react";
import {
  DropdownButton,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
class ThemeSwitcher extends Component {

  state = { theme: null };

  chooseTheme = (theme, evt) => {
    evt.preventDefault();
    if (theme.toLowerCase() === "reset") {
      theme = null;
    }
    this.setState({ theme });
  };

  render() {
    const { theme } = this.state;
    const themeClass = theme ? theme.toLowerCase() : "default";

    const parentContainerStyles = {
      position: "absolute",
      height: "100%",
      width: "100%",
      display: "table",
    };

    const subContainerStyles = {
      position: "relative",
      height: "100%",
      width: "100%",
      display: "table-cell",
      verticalAlign: "middle",
    };

    return (
      <div style={parentContainerStyles}>
        <div style={subContainerStyles}>
          <span
            className={`h1 center-block text-center text-${
              theme ? themeClass : "muted"
            }`}
            style={{ marginBottom: 25 }}
          >
            {theme || "Default"}
          </span>

          <div className="center-block text-center">
            <DropdownButton as={ButtonGroup} id={`dropdown-variants`}>
              <Dropdown.Item eventKey="Primary" onSelect={this.chooseTheme}>
                Primary Theme
              </Dropdown.Item>
              <Dropdown.Item eventKey="Danger" onSelect={this.chooseTheme}>
                Danger Theme
              </Dropdown.Item>
              <Dropdown.Item eventKey="Success" onSelect={this.chooseTheme}>
                Success Theme
              </Dropdown.Item>
              <Dropdown.Item divider />
              <Dropdown.Item eventKey="Reset" onSelect={this.chooseTheme}>
                Default Theme
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    );
  }
}

export default ThemeSwitcher;
