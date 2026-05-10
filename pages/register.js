import RegisterForm from '../components/site/RegisterForm';

export default function RegisterPage() {
  return (
    <div style={{
      height: '100vh',
      overflowY: 'auto',
      padding: '20px',
    }}
    >
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <RegisterForm />
      </div>
    </div>
  );
}
