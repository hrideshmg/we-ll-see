'use client'

import { useState } from "react"
import Heart from "./svg/heart"
import XCircle from "./svg/x-circle"

export default function Post() {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const [likes, setLikes] = useState(200_000)
  const [dislikes, setDislikes] = useState(500_000_000)

  function toggleLike() {
    if (disliked) {
      setDisliked(false)
      setDislikes(prev => prev - 1)
    }
    setLiked(prev => !prev)
    setLikes(prev => (!liked ? prev + 1 : prev - 1))
  }

  function toggleDislike() {
    if (liked) {
      setLiked(false)
      setLikes(prev => prev - 1)
    }
    setDisliked(prev => !prev)
    setDislikes(prev => (!disliked ? prev + 1 : prev - 1))
  }

  return (
    <div className="w-full max-w-xl border border-neutral-700 rounded-lg bg-black text-white overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-600 rounded-full" />
          <span className="font-semibold">amansxcalibur</span>
        </div>
        <button className="text-xl">⋮</button>
      </div>

      {/* Post Image */}
      <div className="bg-green-500 w-full h-[70vw] max-h-[600px] flex items-center justify-center text-black">
        im post
      </div>

      {/* Actions */}
      <div className="px-4 py-3 flex items-center gap-4 text-lg">

        {/* Like */}
        <button onClick={toggleLike} className="flex items-center gap-2">
          <Heart className={liked ? "fill-red-500" : ""} />
          <span>{likes.toLocaleString()}</span>
        </button>

        {/* Dislike */}
        <button onClick={toggleDislike} className="flex items-center gap-2">
          <XCircle className={disliked ? "fill-blue-500" : ""} />
          <span>{dislikes.toLocaleString()}</span>
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-sm">
          <span className="font-semibold mr-2">amansxcalibur</span>
          where am i
        </p>

        <p className="text-sm text-neutral-400 mt-2">View all 420 comments</p>

        <p className="text-[11px] uppercase text-neutral-500 mt-2">
          3 hours ago
        </p>
      </div>

    </div>
  )
}
