import React, { useState } from "react"

const UpdatePassword = () => {
  const [newPassword, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("") // "success" or "danger"
  const [isUpdated, setIsUpdated] = useState(false)
  // State to track password update success

  const handleUpdatePassword = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setMessageType("danger")
      setMessage("Passwords do not match")
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `http://localhost:4001/b1/users/update-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newPassword }),
        }
      )

      if (!response.ok) {
        const text = await response.text() // Read the response as text
        console.error("Error response:", text) // Log the HTML error response
        try {
          const errorData = JSON.parse(text) // Try to parse JSON if possible
          setMessageType("danger")
          setMessage(
            errorData.message || "An error occurred. Please try again."
          )
        } catch (e) {
          setMessageType("danger")
          setMessage("An unexpected error occurred. Please try again.")
        }
      } else {
        setMessageType("success")
        setMessage("Password updated successfully")
        setPassword("")
        setConfirmPassword("")
        setIsUpdated(true) // Set the success state
      }
    } catch (error) {
      setMessageType("danger")
      setMessage("An error occurred. Please try again.")
      console.error(error)
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleUpdatePassword}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={newPassword}
            onChange={(e) => {
              setPassword(e.target.value)
              setMessage("") // Clear message when user starts typing
              setMessageType("")
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setMessage("") // Clear message when user starts typing
              setMessageType("")
            }}
            required
          />
        </div>
        {message && (
          <div className={`alert alert-${messageType}`}>{message}</div>
        )}
        {!isUpdated && (
          <button type="submit" className="btn btn-primary">
            Update Password
          </button>
        )}
      </form>
    </div>
  )
}

export default UpdatePassword
