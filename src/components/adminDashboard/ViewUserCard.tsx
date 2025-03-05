import { Card, CardHeader, CardTitle } from "../ui/card";

const ViewUserCard = ({ totalUsers }) => {
  return (
    <Card className="flex flex-col items-center justify-between transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105">
      <CardHeader>
        <CardTitle className="text-xl">
          Total no of users: {totalUsers}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ViewUserCard;
