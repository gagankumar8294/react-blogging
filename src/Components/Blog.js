//Blogging App using Hooks
import React from "react";
import { useState , useRef , useEffect , useReducer } from "react";

function blogsReducer(state, action) {
    switch(action.type){
        case "ADD":
            return [action.blog, ...state];
        case "REMOVE":
            return state.filter((blog,index) => index !== action.index);
            default:
                return [];
    }
}

export default function Blog(){
    
    // const [title , setTitle] = useState("")
    // const [content , setContent] = useState("")
    const [formData, setFormData] = useState({title: "", content: ""})
    // const [blogs, setBlogs] = useState([]);
    const [blogs , dispatch ] = useReducer(blogsReducer, []);
    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus();
    }, [])
    
    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
        e.preventDefault();

        dispatch({type : "ADD", blog: {title : formData.title, content : formData.content}})
        //setBlogs([{title : formData.title, content : formData.content},...blogs]);
        setFormData({title : "", content: ""});
        titleRef.current.focus();
    }

    function removeBlog(i) {
        //ssetBlogs(blogs.filter((blog, index) => i !== index));
        dispatch({type: "remove", index: i})
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
                                value={formData.title}
                                onChange={(e) => setFormData({title: e.target.value, content: formData.content})}//when input area chnges we have to store the changes
                                ref={titleRef}
                                />
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.content}
                                onChange={(e) => setFormData({title: formData.title, content: e.target.value})}/>
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
                    <div className="blog-btn">
                        <button onClick={() => removeBlog(i)} className="btn remove">
                            Delete
                        </button>
                    </div>
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
