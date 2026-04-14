import './Splash.css';

const SplashScreen = () => {
  return (
    <div style={{
      position: "fixed", 
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0a0a0a",
  zIndex: 9999

    }}>
      
      <h1 style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div className='text-4xl'>

        <span>Symptom</span>
        <span style={{ color: "#4CAF50" }}> Analyzer</span>
        </div>

        {/* Animated dots */}
        <div className="search-loading-dots" aria-hidden="true">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="search-loading-dot"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>
      </h1>

    </div>
  );
};

export default SplashScreen;