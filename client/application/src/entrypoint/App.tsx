import { Routes, Route } from 'react-router';
import './App.css';

function Home(): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: 'aqua',
        width: '100vw',
        height: '100vh',
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    >
      <h2>The home page</h2>
      <p> This is the begining</p>
    </div>
  );
}

function Login(): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: 'blue',
        width: '100vw',
        height: '100vh',
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    >
      <h2>Login page</h2>
      <form action="">
        <input type="password" />
        <button>submit</button>
      </form>
    </div>
  );
}

function Signup(): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: 'grey',
        width: '100vw',
        height: '100vh',
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    >
      <h2>Sign in page</h2>
      <form action="">
        <input type="password" />
        <button>submit</button>
      </form>
    </div>
  );
}

function Page404(): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: 'tomato',
        width: '100vw',
        height: '100vh',
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    >
      <h2>PAGE 404</h2>
    </div>
  );
}

function Help(): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: 'rose',
        width: '100vw',
        height: '100vh',
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    >
      <h2>I need help</h2>
      <div>my mental health is in shambles</div>
    </div>
  );
}

function App() {
  console.log('here');
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route
          path="/my-account"
          element={<div>My account</div>}
          // loader={({ params }) => {
          //   return [1, 2, 3];
          // }}
        />

        <Route path="/cart" element={<div>cart</div>} />

        <Route
          path="/products/:class"
          loader={({ params }) => {
            if (products) {
              const param = params.class;

              return param;
            }
            // const param = params.class;

            // return param;
          }}
          element={<div>cart</div>}
        />

        <Route path="/help" element={<Help />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
/* https://youtube.com/shorts/m8biTN2fBEs?feature=share */

export default App;
