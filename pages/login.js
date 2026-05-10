import LoginForm from '../components/site/LoginForm';

export default function Login() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <LoginForm />
      </div>
    </div>
  );
}
