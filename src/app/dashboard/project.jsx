import "./project.css"
import Link from 'next/link';

const Project = ({pro, i}) => {
    const firstTwoChars = pro.title.slice(0, 2);
  return (
    <Link href={`/dashboard/${pro._id}`}>
    <div className="pro-container">
        <div className="initials">
            <h1>{firstTwoChars}</h1>
        </div>
        <div className="text-area">
          <div className="text-init">
      <span>{pro.title}</span>
      <small>4 Episode</small>
      </div>
      <small>Last edited a week ago</small>
      </div>
    </div>
    </Link>
  )
}

export default Project
