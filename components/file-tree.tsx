"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  Folder,
  FileAudio,
  FileVideo,
  Download,
  X,
} from "lucide-react"

// type FileType = {
//   name: string
//   dateAdded: string
//   size: string
//   kind: "FOLDER" | "AUDIO" | "VIDEO"
//   children?: FileType[]
// }

const files = [
  {
    name: "VIDEO",
    dateAdded: "08.23.2024 10:35PM",
    size: "3GB",
    kind: "FOLDER",
    children: [
      {
        name: "KANYE WEST GRAMMYS.MP4",
        dateAdded: "08.23.2024 10:35PM",
        size: "8MB",
        kind: "AUDIO",
      },
    ],
  },
  {
    name: "2.0 6_RELOADED",
    dateAdded: "08.22.2024 01:22AM",
    size: "3GB",
    kind: "FOLDER",
  },
  {
    name: "2.0 ATL_TORONTO",
    dateAdded: "08.22.2024 01:22AM",
    size: "567MB",
    kind: "FOLDER",
    children: [
      {
        name: "P6160003 3.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "41MB",
        kind: "VIDEO",
      },
      {
        name: "P6160010 4.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "48MB",
        kind: "VIDEO",
      },
      {
        name: "P6160028 5.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "13MB",
        kind: "VIDEO",
      },
      {
        name: "P6160033 7.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "19MB",
        kind: "VIDEO",
      },
      {
        name: "P6160070 8.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "72MB",
        kind: "VIDEO",
      },
      {
        name: "P6160076 9.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "75MB",
        kind: "VIDEO",
      },
      {
        name: "P6160091 BOOTH 1 12.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "43MB",
        kind: "VIDEO",
      },
      {
        name: "P6160092 BOOTH 2 13.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "115MB",
        kind: "VIDEO",
      },
      {
        name: "P6160093 14.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "43MB",
        kind: "VIDEO",
      },
      {
        name: "P6160094 15.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "20MB",
        kind: "VIDEO",
      },
      {
        name: "P6160099 16.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "28MB",
        kind: "VIDEO",
      },
      {
        name: "P6160102 17.MP4",
        dateAdded: "08.22.2024 01:22AM",
        size: "50MB",
        kind: "VIDEO",
      },
    ],
  },
  {
    name: "2.0 I_FORGET",
    dateAdded: "08.22.2024 01:22AM",
    size: "137MB",
    kind: "FOLDER",
  },
  {
    name: "2.0 LISTENING_PARTY",
    dateAdded: "08.22.2024 01:22AM",
    size: "749MB",
    kind: "FOLDER",
  },
  {
    name: "2.0 LONG_TALK",
    dateAdded: "08.22.2024 01:22AM",
    size: "667MB",
    kind: "FOLDER",
  },
]

const FileIcon = ({ kind }) => {
  switch (kind) {
    case "FOLDER":
      return <Folder className="w-4 h-4 text-gray-400" />
    case "AUDIO":
      return <FileAudio className="w-4 h-4 text-gray-400" />
    case "VIDEO":
      return <FileVideo className="w-4 h-4 text-gray-400" />
    default:
      return null
  }
}

const FileTreeItem = ({ file, onSelect, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleClick = () => {
    if (file.kind === "FOLDER") {
      setIsOpen(!isOpen)
    } else {
      onSelect(file)
    }
  }

  return (
    <>
      <div
        className={`grid grid-cols-6 grid-flow-col auto-cols-auto place-items-start justify-items-center py-2 px-4  hover:bg-gray-800 cursor-pointer`}
        style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
        onClick={handleClick}
      >
        <div className="flex items-center max-w-fit">
          {file.children && (
            <ChevronDown
              className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                isOpen ? "transform rotate-0" : "transform -rotate-90"
              }`}
            />
          )}
          <FileIcon kind={file.kind} />
        </div>
        <span className="ml-1 text-clip  place-self-center text-center w-auto mx-2 col-start-2 text-xs">
          {file.name}
        </span>
        <span className="text-gray-500 text-sm mx-auto col-start-3">
          {file.dateAdded}
        </span>
        <span className="text-gray-500 text-sm col-start-4 mx-auto">
          {file.size}
        </span>
        <span className="text-gray-500 text-sm col-start-5 mx-auto">
          {file.kind}
        </span>
        {file.kind !== "FOLDER" && (
          <button className="text-blue-500 hover:text-blue-400 justify-self-center col-start-6">
            <Download className="w-4 h-4" />
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {isOpen && file.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-7"
          >
            {file.children.map((child) => (
              <FileTreeItem
                key={child.name}
                file={child}
                onSelect={onSelect}
                // depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const MediaWindow = ({ file, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{file.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
          {file.kind === "AUDIO" ? (
            <audio controls className="w-full">
              <source src={`/placeholder.mp3`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <video controls className="w-full h-full">
              <source src={`/placeholder.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="mt-4 text-sm text-gray-400">
          <p>Date Added: {file.dateAdded}</p>
          <p>Size: {file.size}</p>
          <p>Kind: {file.kind}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Component() {
  const [selectedFile, setSelectedFile] = useState(null)

  return (
    <div className="bg-gray-900 text-white min-h-screen max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">100GIGSFORYOURHEADTOP</h1>
      <div className="bg-black rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 grid-flow-col auto-cols-auto justify-items-center font-semibold text-gray-400 py-2 px-4">
          {/* <span className="w-8 col-start-1"></span> */}
          <span className="col-start-2">Name</span>
          <span className="min-w-fit mx-auto col-start-3">Date Added</span>
          <span className="w-1/6 mx-auto col-start-4">Size</span>
          <span className="w-1/6 mx-auto col-start-5">Kind</span>

          <span className="w-1/7 mx-auto col-start-6">Action</span>
        </div>
        {files.map((file) => (
          <FileTreeItem
            key={file.name}
            file={file}
            onSelect={setSelectedFile}
          />
        ))}
      </div>
      <AnimatePresence>
        {selectedFile && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSelectedFile(null)}
            />
            <MediaWindow
              file={selectedFile}
              onClose={() => setSelectedFile(null)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
