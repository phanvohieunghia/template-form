export const ChatViewConversation = () => {
  // useEffect(() => {
  //   setMessage(data?.getRoomMessages.data || [])
  // }, [data])
  return (
    <div className='scrollbar-thin flex h-[calc(100vh-75px-56px)] flex-col-reverse overflow-auto p-2'>
      {/* {messages &&
        messages.map((item, i, items) => {
          const isAvatar = i === items.length - 1 || items[i + 1].authorId !== item.authorId
          return (
            <ChatViewMessage isAvatar={isAvatar} me={item.authorId === auth.current._id} time={item.createdAt} key={item._id}>
              {item.content}
            </ChatViewMessage>
          )
        })} */}
    </div>
  )
}
