import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { ListGroup } from "react-bootstrap";
import { TiArrowSortedDown } from "react-icons/ti";
import { LuNotebookPen } from "react-icons/lu";

import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export default function Assignments() {
    const { cid } = useParams();
    const assignments = useSelector(
        (state: any) => state.assignmentReducer.assignments
    );

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div id="wd-assignments">
            {currentUser?.role === "FACULTY" && (
                <div>
                    <AssignmentControls />
                    <br />
                    <br />
                </div>
            )}
            <ListGroup className="rounded-0" id="wd-assignments">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <TiArrowSortedDown />
                        ASSIGNMENTS
                        <div className="float-end">
                            <span className="border border-dashed rounded px-2 py-1">
                                40% of Total
                            </span>
                            <BsPlus />
                            <IoEllipsisVertical className="fs-4" />
                        </div>
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        {assignments
                            .filter(
                                (assignment: any) => assignment.course === cid
                            )
                            .map(
                                ({
                                    _id,
                                    title,
                                    availableDate,
                                    dueDate,
                                    points,
                                }: {
                                    _id: string;
                                    title: string;
                                    availableDate: string;
                                    dueDate: string;
                                    points: number;
                                }) => (
                                    <ListGroup.Item
                                        key={_id}
                                        action
                                        href={`#/Kambaz/Courses/${cid}/Assignments/${_id}`}
                                        className="wd-lesson p-3 ps-2 d-flex align-items-center"
                                    >
                                        <BsGripVertical className="me-2 fs-3" />
                                        <LuNotebookPen
                                            className="me-2 fs-3"
                                            style={{ color: "green" }}
                                        />
                                        <div className="flex-grow-1">
                                            <h4>
                                                <b>{title}</b>
                                            </h4>
                                            <p>
                                                <text className="text-danger">
                                                    Multiple Modules
                                                </text>{" "}
                                                | <b>Not available until</b>{" "}
                                                {formatDate(availableDate)} |
                                            </p>
                                            <p>
                                                <b>Due</b> {formatDate(dueDate)}{" "}
                                                | {points} pts
                                            </p>
                                        </div>
                                        <div>
                                            <AssignmentControlButtons
                                                assignmentId={_id}
                                            />
                                        </div>
                                    </ListGroup.Item>
                                )
                            )}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}
