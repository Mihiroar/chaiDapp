import React, { useState } from "react";
import { ethers } from "ethers";

const Buy = ({ state }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;

    if (!contract) {
      console.error("Contract not available");
      return;
    }

    try {
      const amount = { value: ethers.utils.parseEther("0.001") };
      const transaction = await contract.buyChai(name, message, amount);
      await transaction.wait();
      console.log("Transaction is done");
    } catch (error) {
      console.error("Error in buying chai:", error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
      <form onSubmit={buyChai}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Your ShubhNaam"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <input
            type="text"
            className="form-control"
            id="message"
            placeholder="Enter Your Sandesh"
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!state.contract}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default Buy;
