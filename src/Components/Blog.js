//Blogging App using Hooks
import React from "react";
import { useState } from "react";

export default function Blog(){
    
    const [title , setTitle] = useState("")
    const [content , setContent] = useState("")
    const [blogs, setBlogs] = useState([]);
    
    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
        e.preventDefault();

        setBlogs([{title, content},...blogs]);
        setTitle("");
        setContent("");
    }

    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}//when input area chnges we have to store the changes
                                />
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}/>
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
            {blogs.map((blogs,i) => (
                <div className="blog" key={i}>
                    <h3>{blogs.title}</h3>
                    <p>{blogs.content}</p>
                </div>
            ))}
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
