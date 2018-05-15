import React from "react";

class Footer extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <div className={"footer"}>
        <p id="footer_name">Copyright © 2018 Nicholas Vincent-Hill</p>
        <p>
          The information presented on this site about Magic: The Gathering, <br />
          both literal and graphical, is copyrighted by Wizards of the Coast. <br />
          This website is not produced, endorsed, supported, or affiliated with <br />
          Wizards of the Coast. <br />
        </p>
      </div>
    );
  }
}
export default Footer;
