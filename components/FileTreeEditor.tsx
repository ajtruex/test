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

type FileType = {
  name: string
  dateAdded: string
  size: string
  kind: "FOLDER" | "AUDIO" | "VIDEO"
  children?: FileType[]
}

const files: FileType[] = [
  {
    name: "1_NEW",
    dateAdded: "08.23.2024 10:35PM",
    size: "47MB",
    kind: "FOLDER",
    children: [
      {
        name: "NO FACE - DRAKE.MP3",
        dateAdded: "08.23.2024 10:35PM",
        size: "8MB",
        kind: "AUDIO",
      },
      {
        name: "SOD - DRAKE.MP3",
        dateAdded: "08.23.2024 10:35PM",
        size: "8MB",
        kind: "AUDIO",
      },
      {
        name: "CIRCADIAN RHYTHM - DRAKE.MP3",
        dateAdded: "08.23.2024 10:35PM",
        size: "2MB",
        kind: "AUDIO",
      },
      {
        name: "IT'S UP - DRAKE.MP3",
        dateAdded: "08.02.2024 07:04AM",
        size: "11MB",
        kind: "AUDIO",
      },
      {
        name: "BLUE GREEN RED - DRAKE.MP3",
        dateAdded: "08.09.2024 06:42PM",
        size: "9MB",
        kind: "AUDIO",
      },
      {
        name: "HOUSEKEEPING KNOWS - DRAKE.MP3",
        dateAdded: "08.02.2024 07:04AM",
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

const FileIcon = ({ kind }: { kind: FileType["kind"] }) => {
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

const FileTreeItem = ({
  file,
  onSelect,
  depth = 0,
}: {
  file: FileType
  onSelect: (file: FileType) => void
  depth?: number
}) => {
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
        className={`grid grid-cols-[auto_1fr_200px_100px_100px_auto] items-center py-2 px-4 hover:bg-gray-800 cursor-pointer`}
        style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
        onClick={handleClick}
      >
        <div className="flex items-center">
          {file.children && (
            <ChevronDown
              className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                isOpen ? "transform rotate-0" : "transform -rotate-90"
              }`}
            />
          )}
          <FileIcon kind={file.kind} />
        </div>
        <span className="ml-2 truncate">{file.name}</span>
        <span className="text-gray-500 text-sm">{file.dateAdded}</span>
        <span className="text-gray-500 text-sm">{file.size}</span>
        <span className="text-gray-500 text-sm">{file.kind}</span>
        {file.kind !== "FOLDER" && (
          <button className="text-blue-500 hover:text-blue-400 justify-self-end">
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
          >
            {file.children.map((child) => (
              <FileTreeItem
                key={child.name}
                file={child}
                onSelect={onSelect}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const MediaWindow = ({
  file,
  onClose,
}: {
  file: FileType
  onClose: () => void
}) => {
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

export default function FileTreeEditor() {
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">100GIGSFORYOURHEADTOP</h1>
      <div className="bg-black rounded-lg overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_200px_100px_100px_auto] font-semibold text-gray-400 py-2 px-4">
          <span className="w-8"></span>
          <span>Name</span>
          <span>Date Added</span>
          <span>Size</span>
          <span>Kind</span>
          <span>Action</span>
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
