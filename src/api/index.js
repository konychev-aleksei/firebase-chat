import date from 'date-and-time'
import { db } from '../firebase'

import { CHATS, RECIEVED, VALUE } from '../config/index'


export const createAccount = async (userName, email, profileImage) => {
  try {
    const now = new Date()

    const initialDialog = {
      text: 'Start chatting',
      unread: 0,
      userName,
      email,
      profileImage
    },
    initialMessage = {
      text: 'Start chatting',
      sender: userName,
      date: date.format(now, 'dddd, MMMM D YYYY').toUpperCase(),
      time: date.format(now, 'HH:mm')
    }

    let userData
    await db.ref(RECIEVED).child(email).once(VALUE, sn => userData = sn.val())

    if (!userData) {
      await db.ref(RECIEVED).child(email).set([initialDialog])
      await db.ref(CHATS).child(`${email},${email}`).set([initialMessage])
    }
  }
  catch (e) {
    console.error(e)
  }
}

export const runSearch = async (query) => {
  try {
    let searchResultObj, searchResult = []
    await db.ref(RECIEVED).orderByKey().startAt(`${query}-`).endAt(`${query}~`).once(VALUE, sn => searchResultObj = (sn.val() ?? {}))
    for (let key in searchResultObj) {
      searchResult.push(searchResultObj[key][0])
    }

    return searchResult
  }
  catch (e) {
    console.error(e)
  }
}

export const sendMessage = async (sender, senderProfileImage, senderEmail, reciever, recieverProfileImage, recieverEmail, message) => {
  const now = new Date()
  const { text, attachment } = message

  const senderDialog = {
    text: `You: ${text}`,
    unread: -1,
    email: recieverEmail,
    userName: reciever,
    profileImage: recieverProfileImage
  },
  newMessage = {
    text,
    attachment,
    sender,
    date: date.format(now, 'dddd, MMMM D YYYY').toUpperCase(),
    time: date.format(now, 'HH:mm')
  },
  chat = [senderEmail, recieverEmail].sort().join(',')

  const chatRef = await db.ref(CHATS).child(chat),
        recieverDialogsRef = await db.ref(RECIEVED).child(recieverEmail),
        senderDialogsRef = await db.ref(RECIEVED).child(senderEmail)

  let recieverDialogs
  await recieverDialogsRef.once(VALUE, sn => recieverDialogs = sn.val())

  if (!recieverDialogs) {
    return
  }
  else {
    const recieverDialog = {
      text,
      unread: (recieverDialogs.find((item) => item.userName === sender)?.unread ?? 0) + 1,
      userName: sender,
      email: senderEmail,
      profileImage: senderProfileImage
    }
    await recieverDialogsRef.set(
      recieverDialogs.length === 1 ?
      recieverDialogs[0].userName === sender ? [{ ...recieverDialog, unread: 0 }] : [...recieverDialogs, recieverDialog]
      :
      recieverDialogs.map((item) => item.userName === sender ? recieverDialog : item)
    )
  }

  if (senderEmail !== recieverEmail) {
    let senderDialogs
    await senderDialogsRef.once(VALUE, sn => senderDialogs = sn.val())
    await senderDialogsRef.set(
      senderDialogs.length === 1 ?
      [...senderDialogs, senderDialog]
      :
      senderDialogs.map((item) => item.userName === reciever ? senderDialog : item)
    )
  }


  let messages
  await chatRef.once(VALUE, sn => messages = (sn.val() ?? []))
  await chatRef.set([...messages, newMessage])
}

export const readDialog = async (sender, reciever, senderEmail, recieverEmail) => {
  const recieverDialogsRef = await db.ref(RECIEVED).child(recieverEmail),
        senderDialogsRef = await db.ref(RECIEVED).child(senderEmail)

  let senderDialogs
  await senderDialogsRef.once(VALUE, sn => senderDialogs = sn.val())
  await senderDialogsRef.set(
    senderDialogs.map((item) => item.userName === reciever ? { ...item, unread: 0 } : item)
  )

  let recieverDialogs
  await recieverDialogsRef.once(VALUE, sn => recieverDialogs = sn.val())
  await recieverDialogsRef.set(
    recieverDialogs.map((item) => item.userName === sender ? { ...item, unread: 0 } : item)
  )
}
