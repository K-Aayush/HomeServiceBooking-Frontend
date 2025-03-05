const ViewUserCard = (totalUsers: number) => {
  return <Card className="flex flex-col justify-between cursor-pointer">
  <CardHeader>
    <CardTitle className="text-2xl">{event.title}</CardTitle>
    <CardDescription className="flex justify-between">
      <span>
        {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
      </span>

      <span>{event._count.booking} Bookings</span>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>
      {event.description
        ? event.description.substring(
            0,
            event.description.indexOf(".") !== -1
              ? event.description.indexOf(".")
              : event.description.length
          )
        : "No description avialable"}
    </p>
  </CardContent>
  {!isPublic && (
    <CardFooter className="flex gap-2">
      <Button onClick={handleCopy} variant={"outline"}>
        <Link className="w-4 h-4 mr-2" />{" "}
        {isCopied ? "Copied!" : "Copy Link"}
      </Button>
      <Button
        variant={"destructive"}
        onClick={handleDelete}
        disabled={loading}
      >
        <Trash className="w-4 h-4 mr-2" />
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </CardFooter>
  )}
</Card>;
};

export default ViewUserCard;
