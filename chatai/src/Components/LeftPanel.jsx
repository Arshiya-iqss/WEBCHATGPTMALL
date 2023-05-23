import { FaArrowLeft, FaCheck, FaHammer, FaKey } from "react-icons/fa";
import { Context } from "../context/contextApi";
import { useContext } from "react";

export default function LeftNav() {
  const {
    active,
    setActive,
    showOpenaiApiForm,
    setShowOpenaiApiForm,
    showChatgptmallApiForm,
    setShowChatgptmallApiForm,
    ApiKey,
    setApiKey,
    endpoint,
    setEndPoint,
    microSoftApiForm,
    setMicroSoftApiForm,
    microSoftEndPoint,
    setMicroSoftEndPoint,
  } = useContext(Context);

  const checkLocalStorage = () => {
    const keys = ["openAi_apiKey", "chatgptmall_apikey", "microsoft_apikey"];

    let presentKeys = 0;

    for (const key of keys) {
      if (localStorage.getItem(key)) {
        presentKeys++;
      }
    }

    return presentKeys >= 2;
  };

  const apiPresentInLocalStorage = checkLocalStorage();
  console.log("apiPresentInLocalStorage", apiPresentInLocalStorage);

  return (
    <>
      <FaArrowLeft
        onClick={() => {
          setActive(!active);
        }}
        className={`arrow ${active ? "rotate" : ""}`}
      ></FaArrowLeft>
      <div
        className={`left-nav ${
          active ? "hideNav" : "showNav"
        } d-flex flex-column justify-content-between`}
      >
        <div className="upper-section d-flex flex-column gap-2">
          <form>
            <input
              type="text"
              placeholder="Search..."
              className="form-control mt-2 py-2"
            />
          </form>
          {apiPresentInLocalStorage && (
            <select class="form-select" aria-label="Default select example">
              <option selected>Choose API</option>
              {localStorage.getItem("chatgptmall_apikey") && (
                <option value="1">Chatgptmall API Key</option>
              )}
              {localStorage.getItem("microsoft_apikey") && (
                <option value="2">Microsoft API Key</option>
              )}
              {localStorage.getItem("openAi_apiKey") && (
                <option value="3">Open AI API Key</option>
              )}
            </select>
          )}
        </div>
        <div className="lower-section">
          <ul className="list-group m-2 pt-3 rounded-0">
            <li className="d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3">
              <span className="icon">
                <FaKey></FaKey>
              </span>
              {!showChatgptmallApiForm && (
                <>
                  <span
                    onClick={() => {
                      setShowChatgptmallApiForm(true);
                    }}
                  >
                    Chatgptmall API Key
                  </span>
                </>
              )}
              {showChatgptmallApiForm && (
                <form className="d-flex align-items-center gap-2">
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Api Key"
                    className="form-control form-control-sm"
                    value={ApiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                    }}
                  />
                  <span className="btn btn-sm text-white p-0 ">
                    <FaCheck
                      onClick={() => {
                        localStorage.setItem("chatgptmall_apikey", ApiKey);
                        setShowChatgptmallApiForm(false);
                        console.log("Api Key Stored in Local Storage.");
                      }}
                    ></FaCheck>
                  </span>
                  <span className="btn btn-sm text-white p-0 ">
                    <FaArrowLeft
                      onClick={() => {
                        setShowChatgptmallApiForm(false);
                      }}
                    ></FaArrowLeft>
                  </span>
                </form>
              )}
            </li>

            {/* -------------------------------------------------------- */}

            <li className="d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3">
              <span className="icon">
                <FaKey></FaKey>
              </span>
              {!microSoftApiForm && !microSoftEndPoint && (
                <>
                  <span
                    onClick={() => {
                      setMicroSoftApiForm(true);
                    }}
                  >
                    Microsoft API Key
                  </span>
                </>
              )}
              {microSoftApiForm &&
                !localStorage.getItem("microsoft_apikey") && (
                  <form className="d-flex align-items-center gap-2">
                    <input
                      type="password"
                      autoComplete="off"
                      placeholder="Api Key"
                      className="form-control form-control-sm"
                      value={ApiKey}
                      onChange={(e) => {
                        setApiKey(e.target.value);
                      }}
                    />
                    <span className="btn btn-sm text-white p-0 ">
                      <FaCheck
                        onClick={() => {
                          localStorage.setItem("microsoft_apikey", ApiKey);
                          setMicroSoftApiForm(false);
                          setMicroSoftEndPoint(true);
                          console.log("Api Key Stored in Local Storage.");
                        }}
                      ></FaCheck>
                    </span>
                    <span className="btn btn-sm text-white p-0 ">
                      <FaArrowLeft
                        onClick={() => {
                          setMicroSoftApiForm(false);
                        }}
                      ></FaArrowLeft>
                    </span>
                  </form>
                )}

              {microSoftEndPoint && (
                <form className="d-flex align-items-center gap-2">
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Enter Endpoint"
                    className="form-control form-control-sm"
                    value={endpoint}
                    onChange={(e) => {
                      setEndPoint(e.target.value);
                    }}
                  />
                  <span className="btn btn-sm text-white p-0 ">
                    <FaCheck
                      onClick={() => {
                        localStorage.setItem("microsoft_endpoint", endpoint);
                        setShowChatgptmallApiForm(false);
                        setMicroSoftEndPoint(false);
                        console.log("Endpoint Stored in Local Storage.");
                      }}
                    ></FaCheck>
                  </span>
                  <span className="btn btn-sm text-white p-0 ">
                    <FaArrowLeft
                      onClick={() => {
                        setMicroSoftEndPoint(false);
                      }}
                    ></FaArrowLeft>
                  </span>
                </form>
              )}
            </li>

            {/* -------------------------------------------------------- */}

            <li className="d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3">
              <span className="icon">
                <FaKey></FaKey>
              </span>
              {!showOpenaiApiForm && (
                <>
                  <span
                    onClick={() => {
                      setShowOpenaiApiForm(true);
                    }}
                  >
                    Open AI Api Key
                  </span>
                </>
              )}
              {showOpenaiApiForm && (
                <form className="d-flex align-items-center gap-2">
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Api Key"
                    className="form-control form-control-sm"
                    value={ApiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                    }}
                  />
                  <span className="btn btn-sm text-white p-0 ">
                    <FaCheck
                      onClick={() => {
                        localStorage.setItem("openAi_apiKey", ApiKey);
                        setShowOpenaiApiForm(false);
                        console.log("Api Key Stored in Local Storage.");
                      }}
                    ></FaCheck>
                  </span>
                  <span className="btn btn-sm text-white p-0 ">
                    <FaArrowLeft
                      onClick={() => {
                        setShowOpenaiApiForm(false);
                      }}
                    ></FaArrowLeft>
                  </span>
                </form>
              )}
            </li>
            <li className="d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3">
              <span className="icon">
                <FaHammer></FaHammer>
              </span>
              <span>Settings</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
