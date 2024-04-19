import logo from '../logo.svg';
import '../css/App.css';
import PostsList from '../features/list/postsList.js';
import Header from '../components/header/header.js';


function App(props) {
  

  return (
    <div className="App">
        <Header/>
        <PostsList/>
    </div>
  );
}

export default App;
