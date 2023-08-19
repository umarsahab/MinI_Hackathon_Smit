
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword ,signOut,  
     onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
     import { getFirestore , doc, setDoc ,  collection,addDoc , query , where , getDoc , getDocs , deleteDoc}
      from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

      const firebaseConfig = {
        apiKey: "AIzaSyAIV4b-Say1MOQPncO8zWFccTFqRmnlAxQ",
        authDomain: "mini-hackathon-dde1b.firebaseapp.com",
        projectId: "mini-hackathon-dde1b",
        storageBucket: "mini-hackathon-dde1b.appspot.com",
        messagingSenderId: "537170330649",
        appId: "1:537170330649:web:1bb592cd3336a55ee85688",
        measurementId: "G-WLLJFTVKSM"
      };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
   console.log(app)

const signUpBtn = document.getElementById('signin_body_btn')
const loginBtn= document.getElementById('login_body_btn')
const signIn= document.getElementById('signin_body')
const login= document.getElementById('login_body')
const SignIn_BTn = document.getElementById('SignIn_btn')
const LogIn_Btn = document.getElementById('logIn_btn')
const content = document.getElementById('content')
const dashBoardbtn = document.getElementById('dashboardPage')
const dashBoardForm = document.getElementById('event_form')
const submitBlogBtn = document.getElementById("submitBlog");
const ContainerContent = document.getElementById('Blog_post')
const ProfileDiv = document.getElementById('ProbileDiv_btn')
const LogOutBtn = document.getElementById('LogOutBtn')
const ProfileBody = document.getElementById('profile_div')
const mainReader = document.getElementById('MainReaderPage')
const head = document.getElementById('heading')
let info;




onAuthStateChanged(auth,  async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
  
    console.log(uid)
  signIn.style.display = "none"
  content.style.display = "block";
  const info = await getUserInfo(uid)
  LogOutBtn.style.display = 'block'
  signUpBtn.style.display = "none"
  head.style.display = 'block'
  welcome.innerHTML = `Welcome ${info.name}`
  // ...
  getPosts()
    
    // ...
  } else {
    // User is signed out
    // ...
  }
});
ProfileDiv.addEventListener('click' , () =>{
  ProfileBody.style.display = 'block'
  ContainerContent.style.display = "none"
  signIn.style.display = "none"
  login.style.display = "none"
  dashBoardForm.style.display = "none"
})
mainReader.addEventListener('click' , ()=>{

  ContainerContent.style.display = 'block'
  signIn.style.display = "none"
  login.style.display = "none"
  dashBoardForm.style.display = "none"
  ProfileBody.style.display = 'none'

})



signUpBtn.addEventListener('click', () => {
  ProfileBody.style.display = 'none'
  ContainerContent.style.display = "none"
    signIn.style.display = "block"
    login.style.display = "none"
    signIn.style.display = "flex"
    signIn.style.justifyContent = 'center'
    

})
loginBtn.addEventListener('click', () => {
    signIn.style.display = "none"
    login.style.display = "block"
    login.style.display = "flex"
    login.style.justifyContent = 'center'
})

dashBoardbtn.addEventListener('click' , ()=>{
  ProfileBody.style.display = 'none'
  ContainerContent.style.display = "block"
  signIn.style.display = "none"
  login.style.display = "none"
    dashBoardForm.style.display = 'block'
})

SignIn_BTn.addEventListener('click' , userSignUp)
LogIn_Btn.addEventListener('click' , LogInUser)
submitBlogBtn.addEventListener('click', blogPost)
LogOutBtn.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("user Out Hogya hn")
      }).catch((error) => {
        // An error happened.
      });
})

function userSignUp(){
const firstName = document.getElementById('Signin_input_name').value
const lastName = document.getElementById('Signin_input_l/name').value
const email = document.getElementById('signin_input_email').value
const password = document.getElementById('signin_input_password').value

createUserWithEmailAndPassword(auth, email , password)
  .then( async (userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const userInfo = {
        firstName,
        lastName,
        email,
        id: user.uid
    }
    console.log(userInfo)
    const userRef = doc(db , 'Users_infos' , user.uid)
    await setDoc(userRef , userInfo)
    // console.log(userInfo)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  console.log(error)
    // ..
  });

}




  function LogInUser(){
    const email = document.getElementById('login_input_email')
    console.log(email.value);
const password = document.getElementById('login_input_password')

signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode)
  });
  }
  async function getUserInfo(uid) {
    const userRef = doc(db, "Users_infos", uid)
    const docSnap = await getDoc(userRef);
    info = null
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        info = docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

    return info
}
 


//   const date =  new Date().getTime().toString()
async function blogPost(e) {
    e.preventDefault()
    try {
        // Getting input values
        // const userName = document.getElementById('Signin_input_name')
        const blogName = document.getElementById("BlogName").value;
        const blogDescription = document.getElementById("BlogDescription").value;
        
        const date = new Date().getTime().toString();

        // Creating a blog object
        console.log();
        const Blogobj = {
          
            blogName,
            blogDescription,
            date,
            
        };
        // Firestore integration
        const blogRef = collection(db, 'Blogs_post');
        const newEventRef = await addDoc(blogRef, Blogobj);
        console.log("blogtref", newEventRef.id);

    } catch (error) {
        // Handling errors
        console.error("Error posting blog:", error);
        alert("An error occurred while posting the blog.");
    }
}

async function getPosts() {
    const q = query(collection(db, "Blogs_post"))
    //  , where("userUid", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    ContainerContent.innerHTML = null
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const postInfo = doc.data()
        console.log(postInfo)
        const { blogName, date , userName, blogDescription
        } = postInfo
        console.log(doc.data())
      ContainerContent.innerHTML += `  <div id="Blog_main">
      <div class="AllBlogs_con my-3 px-5 pt-5 pb-1 rounded shadow-sm d-flex flex-column">
          <div class="postpersondiv d-flex">
              <img width="60px" height="60px" class="rounded-3 imageofpost me-3" src="Images/user1.jpg" />
              <div>
                  <h3>${blogName}</h3>
                  <p>Date:${new Date().toLocaleDateString()} ${userName}</p>
              </div>
          </div>
          <div class="mainContentOfPost">
              ${blogDescription}
          </div>
          <div class="editdeletearea d-flex mt-5">
              <p class="ms-4">See All From this user</p>
          </div>
          <button class="Content_btn id="Edit_btn">Edit</button>
          <button class="Content_btn" id="Delete_btn" onClick="delpost ('${doc.id}')">Delete</button>
      </div>
  </div>`

    });
}

async function delpost(id){
  console.log(id);
  await deleteDoc(doc(db, "Blogs_post", id));
  console.log("Delete Hogya hn")
  }
  window.delpost=delpost
// const DeleteBtn = document.getElementById('Delete_btn')
// const EditBtn = document.getElementById('Edit_btn')

// DeleteBtn.addEventListener('click' , deleteFunc)
// EditBtn.addEventListener('click' , editFunc)
// function deleteFunc() {
//   const eventRef = collection(db , )
//   // console.log(eventRef);
//   remove(eventRef)
// }

// function editFunc(){

// }
