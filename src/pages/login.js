import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/iconClear.png";
import { Link } from "react-router-dom";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

// TODO: takes style from App.js
const styles = {
  typography: {
    useNextVariants: true,
  },
  form: {
    textAlign: "center",
  },
  image: {
    margin: "-30px auto -20px auto",
  },
  pageTitle: {
    margin: "-5px -10px -5px auto",
  },
  textField: {
    margin: "5px auto 5px 6px",
  },
  button: {
    margin: "16px -10px auto auto",
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
  },
  progress: {
    position: "absolute",
  },
};

class login extends Component {
  //create refrences or controled state in this version
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors) {
        this.setState({ errors: nextProps.UI.errors });
      }
  }
   
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="AppIcon" className={classes.image} />
          <Typography variant="h4" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              // display error
              helperText={errors.email}
              //send state red if err
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              // display error
              helperText={errors.password}
              //send state red if err
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Dont have an account ? SignUp <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

// maps what to display from store.js const reducers (Brought in from global state)
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
