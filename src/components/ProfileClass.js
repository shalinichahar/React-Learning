   import React from "react";

   class Profile extends React.Component{
    constructor(props){
        super(props);
        // Create State
        this.state = { 
            count:0,
            count2:0,
        };
        console.log("Constructor1");
    }

    componentDidMount(){
        // API Calls // after render
        console.log("componentDidMount3");
    }

     render(){
        //destructuring
        const {count} = this.state;
        console.log("render2")
        return(
            <div>
                <h1>Profile Class Component </h1>
                <h2>Work : {this.props.Work}</h2>
                <h2>Work : {this.props.xyz}</h2>
                {/* <h2>Count: {this.state.count}</h2> */}
                <h2>Count: {count} </h2>
                <button onClick={()=>{
                    // WE DO NOT MUTATE STATE DIRECTLY 
                    // NEVER do this.state = something
                    this.setState({
                        count:1,
                        count2:2,
                    })
                }}> Click me!</button>
            </div>
            
        )
     }
   }

   export default Profile;